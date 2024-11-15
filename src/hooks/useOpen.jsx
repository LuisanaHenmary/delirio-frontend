import { useState } from "react"

export const useOpen = () => {
    const [open, setOpen] = useState(false)

    const changeToOpen = () => {
        setOpen(true)
    }

    const changeToClose = () =>{
        setOpen(false)
    }

    return [open, changeToOpen, changeToClose]
}