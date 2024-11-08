import prisma from "../../DB/db.config.js";

const todoResolver = {
    Query:{
        todo: async() => await prisma.todo.findMany({orderBy: { id: "desc"}})
    },

    Mutation:{
        createTodo: async(_, {todo})=>{
            const newTodo = await prisma.todo.create({
                data:{
                    todo: todo,
                    completed: false
                }
            })
            return newTodo
        },
        updateTodo: async(_,{id,todo}) =>{
            await prisma.todo.update({
                where:{
                    id: id
                },
                data:{
                    todo: todo
                }
            })
            return {message: "Todo updated successfully"}
        },
        toggleComplete: async(_,{id,data})=>{
            await prisma.todo.update({
                where:{
                    id:id
                },
                data:{
                    completed: data
                }
            })
            return {message:"Toggle updated Successfully"}
        },
        deleteTodo:async(_,{id})=>{
            await prisma.todo.delete({
                where:{
                    id:id
                }
            })
            return {message: "Todo deleted successfully"}
        }
    }
}

export default todoResolver