import { deleteItem, getAllMatchingItems } from "../helpers";
import {redirect} from "react-router-dom"
import {toast} from "react-toastify"


export function deleteBudget({params}){
    try {
        deleteItem({
            key:"budgets",
            id:params.id,
        })

        const associatedExpenses = getAllMatchingItems({
            category:"expenses",
            key:"budgetId",
            value:params.id,
        })

        associatedExpenses.forEach((expense) => {
            deleteItem({
                key:"expenses",
                id:expense.id,
            })
        });
        
        toast.success("Budget Deleted Successfully!");
    } catch (error) {
        throw new Error("There was a problem deleting your budget!")
    }

    return redirect("/");
}