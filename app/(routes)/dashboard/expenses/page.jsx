"use client"
import {useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { asc, desc, eq, getTableColumns } from 'drizzle-orm';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema'; // Assuming these are needed for query
import { sql } from 'drizzle-orm/sql'; // Assuming sql is imported for raw SQL

import ExpenseListTable from './_components/ExpenseListTable';

function page() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList,setExpensesList]=useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`coalesce(sum(${Expenses.amount}), 0)`.mapWith(Number),
      totalItem: sql`coalesce(count(${Expenses.id}), 0)`.mapWith(Number)
    })
    .from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id))

    setBudgetList(result);
    getAllExpenses();
  }

  const getAllExpenses =async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt

    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);

  }
  return (
    <div>
       <ExpenseListTable
         expensesList={expensesList}
         refreshData={()=>getBudgetList()}/>
      
    </div>
  )
}

export default page
