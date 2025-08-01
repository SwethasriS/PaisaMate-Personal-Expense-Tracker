"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './createBudget'
import { db } from '@/utils/dbConfig'
import { eq, getTableColumns, sql, desc, asc } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'

import BudgetItem from './BudgetItem'

/*Hiii*/
/*
used to get budget List
*/

function BudgetList() {
  const [budgetList,setBudgetList]=useState([]);
  const { user } = useUser();

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
    .orderBy(asc(Budgets.id))

    setBudgetList(result);

  }
  
  return (
   <div className='mt-7'>
   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
    
      <CreateBudget 
      refreshData={()=>getBudgetList()}/>
      {budgetList?.length>0? budgetList.map((budget,index)=>(
        <BudgetItem key={budget.id} budget={budget}/>
      )
    ):[1,2,3,4,5,6,7,8,9].map((item,index)=>(
    <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>

    </div>
      ))
  }
    </div>
    </div>
  )
}

export default BudgetList
