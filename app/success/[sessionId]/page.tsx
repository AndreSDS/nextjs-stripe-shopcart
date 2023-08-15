'use client'
import {useEffect} from 'react'
import {Check} from 'lucide-react'
import { useShoppingCart } from "use-shopping-cart";

export default function Success({params}: {
    params: {
        sessionId: string
    }
}) {
    const {clearCart} = useShoppingCart()
    useEffect(() => {
        clearCart()
    }, [])

    return (
        <div className="container my-10 flex flex-col items-center justify-center">
            <Check className="h-24 w-24 text-green-500" />
            <h1 className="text-2xl">Parabéns pela compra.</h1>
        </div>
    )
}