"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { asc, desc, eq, getTableColumns } from 'drizzle-orm';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema'; // Assuming these are needed for query
import { sql } from 'drizzle-orm/sql'; // Assuming sql is imported for raw SQL
import BarChart from './_components/BarChartDash';
import BarChartDash from './_components/BarChartDash';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

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
    <div className='p-5'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}✌️</h2>
      <p className='text-gray-500'>Here's What happening with your money, Let's manage your Expenses</p>
      <CardInfo budgetList={budgetList}/>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-4 gap-2 '>
        <div className='md:col-span-2'>
         <BarChartDash budgetList={budgetList}/>

         <ExpenseListTable
         expensesList={expensesList}
         refreshData={()=>getBudgetList()}/>

        </div>
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'>    Latest Budgets</h2>
          {budgetList.map((budget,index)=>(
            <BudgetItem budget={budget} key={index}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
