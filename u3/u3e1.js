// T3. JavaScript profesional en una aplicación web
// U2. Eventos personalizados (custom events)
// Enunciado disponible en u3e1.md / Enunciat disponible a u3e1.md

// MGG - Clase Sender 
class Sender {
  static TYPE_A = "EVENT_NOTIFICATION_A";
  static TYPE_B = "EVENT_NOTIFICATION_B";
  #refDom;
  type;
  count = 0;

  constructor(ref, type) {
    this.#refDom = ref;
    this.type = type;
    this.handleClick = this.handleClick.bind(this);
    this.init();
  }

  init() {
    this.#refDom.addEventListener("click", this.handleClick);
  }

  handleClick() {
    this.trigger();
  }

  trigger() {
    this.count++;
    const event = new CustomEvent(this.type, {
      detail: this.count,
    });
    document.dispatchEvent(event);
    this.render();
  }

  render() {
    const label = this.type === Sender.TYPE_A ? "A" : "B";
    this.#refDom.textContent = `${label}: ${this.count}`;
  }
}

// MGG - Clase Logger
class Logger {
  #refDom;
  notificationList = [];
  #handlers = {};

  constructor(ref) {
    this.#refDom = ref;
    this.init();
  }

  init() {
    this.#handlers[Sender.TYPE_A] = (e) => this.onNotificationReceived(e);
    this.#handlers[Sender.TYPE_B] = (e) => this.onNotificationReceived(e);
    document.addEventListener(Sender.TYPE_A, this.#handlers[Sender.TYPE_A]);
    document.addEventListener(Sender.TYPE_B, this.#handlers[Sender.TYPE_B]);
  }

  onNotificationReceived(event) {
    this.notificationList.unshift(event);
    this.render();
  }

  render() {
    this.#refDom.innerHTML = this.notificationList.map((e) => `${e.type}: ${e.detail}`).join("\n");
  }

  destroy() {
    document.removeEventListener(Sender.TYPE_A, this.#handlers[Sender.TYPE_A]);
    document.removeEventListener(Sender.TYPE_B, this.#handlers[Sender.TYPE_B]);
  }
}

// MGG - Llamadas
const notificationADom = document.querySelector(".js-notification-A");
const notificationBDom = document.querySelector(".js-notification-B");
const loggerDom = document.querySelector(".js-logger");
const nA = new Sender(notificationADom, Sender.TYPE_A);
const nB = new Sender(notificationBDom, Sender.TYPE_B);
const logger = new Logger(loggerDom);

notificationADom.click();
notificationADom.click();
notificationBDom.click();
notificationBDom.click();
notificationBDom.click();
notificationBDom.click();
notificationADom.click();
logger.destroy();
notificationADom.click();
notificationBDom.click();
notificationBDom.click();