import Transaction from '../models/Transaction';
// import CreateTransactionService from '../services/CreateTransactionService';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;
    const income = transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        total += transaction.value;
        return total;
      }
      return total;
    }, 0);
    const outcome = transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome') {
        total += transaction.value;
        return total;
      }
      return total;
    }, 0);
    const total = income - outcome;
    const balance = { income, outcome, total };
    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
