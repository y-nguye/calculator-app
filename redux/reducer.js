const init = {
  keys_row_1: [
    { value: "AC", class: "cal-function", cal: "clr" },
    { value: "DEL", class: "cal-function", cal: "del" },
    { value: "00", class: "cal-function", cal: "key_imp" },
    { value: "/", class: "cal-math", cal: "equ" },
  ],
  keys_row_2: [
    { value: "7", class: "cal-number", cal: "key_imp" },
    { value: "8", class: "cal-number", cal: "key_imp" },
    { value: "9", class: "cal-number", cal: "key_imp" },
    { value: "*", class: "cal-math", cal: "equ" },
  ],
  keys_row_3: [
    { value: "4", class: "cal-number", cal: "key_imp" },
    { value: "5", class: "cal-number", cal: "key_imp" },
    { value: "6", class: "cal-number", cal: "key_imp" },
    { value: "-", class: "cal-math", cal: "equ" },
  ],
  keys_row_4: [
    { value: "1", class: "cal-number", cal: "key_imp" },
    { value: "2", class: "cal-number", cal: "key_imp" },
    { value: "3", class: "cal-number", cal: "key_imp" },
    { value: "+", class: "cal-math", cal: "equ" },
  ],
  keys_row_5: [
    {
      value: "0",
      class: "cal-number cal-button-zero",
      cal: "key_imp",
      colspan: "colspan = '2'",
    },
    { value: ".", class: "cal-number", cal: "key_imp" },
    { value: "=", class: "cal-sol", cal: "dis_sol" },
  ],
  eds: "0",
  pickMath: "",
  disable: "",
};

const actions = {
  disValue: "0",
  equals: "",
  result: "",
  addMath: "",
  isMath: false,
  isSol: false,
  flag: false,
  isImp: true,

  imp(_, value) {
    if (this.disValue === "0") {
      if (
        value == 1 ||
        value == 2 ||
        value == 3 ||
        value == 4 ||
        value == 5 ||
        value == 6 ||
        value == 7 ||
        value == 8 ||
        value == 9
      ) {
        this.disValue = value;
      } else if (value === "0" || value === "00") {
        this.disValue = this.disValue;
      } else {
        this.disValue += value;
      }
    } else {
      this.disValue += value;
    }
  },

  sol(value) {
    function check(expression) {
      try {
        eval(expression);
        return true;
      } catch {
        return false;
      }
    }
    if (check(value)) {
      let x = eval(value);
      return x.toString();
    }
  },

  key_imp(_, value) {
    if (this.flag) {
      this.disValue = "0";
      this.flag = false;
    }
    if (this.isMath) {
      this.equals += this.addMath;
      this.isMath = false;
      init.pickMath = "";
    }
    this.imp(_, value); // -> disValue
    this.display(this.disValue);
  },

  dis_sol() {
    if (!this.isSol) {
      this.equals += this.disValue;
      this.isSol = true;
    } else {
      this.equals = this.disValue;
    }
    this.disValue = this.equals;
    this.result = this.sol(this.equals);
    this.display(this.result);
    this.equals = this.result;
    this.flag = true;
  },

  equ(_, value) {
    this.addMath = value;
    init.pickMath = this.addMath;
    init.disable = "DEL";
    this.isImp = false;
    if (!this.isMath) {
      this.dis_sol();
      this.isMath = true;
      this.isSol = false;
    }
  },

  display(value = 0) {
    init.eds = value;
  },

  del() {
    if (this.isImp) {
      this.disValue = this.disValue.toString().slice(0, -1);
      this.disValue === "" && this.clr();
      this.display(this.disValue);
    }
  },
  clr() {
    this.disValue = "0";
    this.equals = "";
    this.result = "";
    this.addMath = "";
    init.disable = "";
    this.isMath = false;
    this.isSol = false;
    this.flag = false;
    this.isImp = true;
    this.display();
  },
};

export default function reducer(state = init, action, args) {
  actions[action] && actions[action](state, ...args);
  return state;
}
