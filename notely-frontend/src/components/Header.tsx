import React from 'react'
import { Button } from './ui/button'

const Header: React.FC = () => {
  return (
    <header className='p-5 md:p-10 flex justify-between items-center bg-emerald-50'>
      <h1 className='text-3xl md:text-5xl font-semi-bold text-primary md:flex-2/3 md:text-center'>Notely</h1>
      <Button className='bg-emerald-300 hover:bg-emerald-500 text-white p-5 md:p-8 md:text-2xl hover:cursor-pointer'>
        New
      </Button>
    </header>
  )
}

export default Header

