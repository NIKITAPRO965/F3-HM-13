//Напиши скрипт, який, для об'єкта user, послідовно:
// додає поле mood зі значенням 'happy'
// замінює значення hobby на 'skydiving'
// замінює значення premium на false
// виводить вміст об'єкта user в форматі ключ:значення використовуючи Object.keys() і for...of


const user = {
  name: 'John',
  age: 25,
  hobby: 'reading',
  premium: true
};
user.mood = 'happy';
user.hobby = 'skydiving';
user.premium = false;
for (const key of Object.keys(user)) {
  const { [key]: value } = user;
  console.log(`${key}: ${value}`);
}








//Напиши функцію countProps(obj), яка рахує кількість властивостей в об'єкті. Функція повертає число — кількість властивостей.


function countProps(obj) {
  const { length } = Object.keys(obj);
  return length;
}
const user1 = {
  name: 'John',
  age: 25,
  hobby: 'skydiving'
};
console.log(countProps(user1));




//Напиши функцію findBestEmployee(employees), яка приймає об'єкт співробітників і повертає ім'я найпродуктивнішого (який виконав більше всіх задач). Співробітники і кількість виконаних завдань містяться як властивості об'єкта в форматі "ім'я":"кількість задач".


function findBestEmployee(employees) {
  let bestEmployee = '';
  let maxTasks = 0;
  for (const [name, tasks] of Object.entries(employees)) {
    if (tasks > maxTasks) {
      maxTasks = tasks;
      bestEmployee = name;
    }
  }
  return bestEmployee;
}
const employees = {
  Vika: 25,
  David: 55,
  Never: 12,
  Nazzy: 99
};
console.log(findBestEmployee(employees));




//Напиши функцію countTotalSalary(employees) приймаючу об'єкт зарплат. Функція рахує загальну суму зарплати працівників і повертає її. Кожне поле об'єкта, переданого в функцію, має вигляд "ім'я":"зарплата".


function countTotalSalary(employees) {
  let total = 0;
  for (const salary of Object.values(employees)) {
    total += salary;
  }
  return total;
}
const salaries = {
  Vika: 550,
  David: 999,
  Nazzy: 369
};
console.log(countTotalSalary(salaries));



//Напиши функцію getAllPropValues(arr, prop), яка отримує масив об'єктів і ім'я властивості. Повертає масив значень певної властивості prop з кожного об'єкта в масиві.


function getAllPropValues(arr, prop) {
  const result = [];
  for (const obj of arr) {
    if (obj.hasOwnProperty(prop)) {
      const { [prop]: value } = obj;
      result.push(value);
    }
  }
  return result;
}
const products = [
  { name: 'Moris', price: 1300 },
  { name: 'Xenia', price: 2700 },
  { name: 'Heldvald', price: 400 },
  { name: 'Ayza', price: 1200 }
];
console.log(getAllPropValues(products, 'name'));
console.log(getAllPropValues(products, 'price'));







// Напиши функцію calculateTotalPrice(allProdcuts, productName), яка отримує масив об'єктів та ім'я продукту (значення властивості name). Повертає загальну вартість продукту (ціна * кількість).
// Викличи функції для перевірки працездатності твоєї реалізації.



function calculateTotalPrice(allProducts, productName) {
  let total = 0;
  for (const product of allProducts) {
    const { name, price, quantity } = product;
    if (name === productName) {
      total = price * quantity;
      break;
    }
  }
  return total;
}
const products1 = [
  { name: 'Moris', price: 1300, quantity: 4 },
  { name: 'Xenia', price: 2700, quantity: 3 },
  { name: 'Heldvald', price: 400, quantity: 7 },
  { name: 'Ayza', price: 1200, quantity: 9 }
];
console.log(calculateTotalPrice(products1, 'Moris'));
console.log(calculateTotalPrice(products1, 'Xenia'));
console.log(calculateTotalPrice(products1, 'Heldvald'));
console.log(calculateTotalPrice(products1, 'Ayza'));


























// 2. Напиши сценарій керування особистим кабінетом інтернет-банку. Є об'єкт account в якому необхідно реалізувати методи для роботи з балансом та історією транзакцій.

/*
 * Типів транзацкій всього два.
 * Можна покласти або зняти гроші з рахунку.
 */
const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};
/*
 * Кожна транзакція - це об'єкт з властивостями: id, type і amount
 */
const account = {
  // Поточний баланс рахунку
  balance: 0,
  // лічильник транзакції
  nextId: 1,
  // Історія транзакцій
  transactions: [],
  /*
   * Метод створює і повертає об'єкт транзакції.
   * Приймає суму і тип транзакції.
   */
  createTransaction(amount, type) {
    const transaction = {
        amount: amount,
        type: type,
        id: this.nextId
    }
    this.nextId += 1
    return transaction
  },
  /*
   * Метод відповідає за додавання суми до балансу.
   * Приймає суму танзакції.
   * Викликає createTransaction для створення об'єкта транзакції
   * після чого додає його в історію транзакцій
   */
  deposit(amount) {
    this.balance += amount
    const transaction = this.createTransaction(amount,Transaction.DEPOSIT)
    this.transactions.push(transaction)
  },
  /*
   * Метод відповідає за зняття суми з балансу.
   * Приймає суму танзакції.
   * Викликає createTransaction для створення об'єкта транзакції
   * після чого додає його в історію транзакцій.
   *
   * Якщо amount більше, ніж поточний баланс, виводь повідомлення
   * про те, що зняття такої суми не можливо, недостатньо коштів.
   */
  withdraw(amount) {
    if(amount > this.balance){
        alert("Недостатньо коштів для зняття")
        return 
    }
    this.balance -= amount
    const transaction = this.createTransaction(amount,Transaction.WITHDRAW)
    this.transactions.push(transaction)
  },
  /*
   * Метод повертає поточний баланс
   */
  getBalance() {
    return this.balance
  },
  /*
   * Метод шукає і повертає об'єкт транзакції по id
   */
  getTransactionDetails(id) {
    for(let i = 0; i < this.transactions.length; i+= 1 ){
        const transaction = this.transactions[i]
        if(transaction.id === id){
            return transaction
        }
    }
  },
    /*
    * Метод повертає кількість коштів
    * певного типу транзакції з усієї історії транзакцій
    */
  getTransactionTotal(type) {
    let total = 0;
    for(let i = 0;i < this.transactions.length; i+= 1){
        if(this.transactions[i].type === type){
         total += this.transactions[i].amount
        }
    }
    return total
  },
};
account.deposit(1000)
console.log("Сума після поповнення", account.getBalance());
account.deposit(500)
console.log("Сума після поповнення", account.getBalance());
account.deposit(349)
console.log("Сума після поповнення", account.getBalance());
account.deposit(2890)
console.log("Сума після поповнення", account.getBalance());

account.withdraw(1200)
console.log("Сума після зняття", account.getBalance());
account.withdraw(224)
console.log("Сума після зняття", account.getBalance());

const totalDeposit = account.getTransactionTotal("deposit")
console.log(`Загальна сума поповнення складає ${totalDeposit} гривень`);
const totalWithdraw = account.getTransactionTotal("withdraw")
console.log(`Загальна сума зняття складає ${totalWithdraw} гривень`);
const transactionDetails = account.getTransactionDetails(5)
console.log(`Деталі по транзакції`,transactionDetails);

