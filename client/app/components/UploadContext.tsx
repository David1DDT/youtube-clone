'use client'

import { createContext, useContext, useState, ReactNode } from 'react'


type uploadContextType = {
    visible: boolean,
    toggle: () => void
}


export const UploadContext = createContext<uploadContextType | null>(null)

export const UploadProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState<boolean>(false)

    const toggle = () => setVisible(p => !p)

    return (
        <UploadContext.Provider value={{ visible: visible, toggle: toggle }}>
            {children}
        </UploadContext.Provider>
    )

}