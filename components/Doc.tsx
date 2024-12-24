'use client'
import React from 'react'
import dynamic from 'next/dynamic'
const Editor = dynamic(()=> import('./Editor'),{ssr:false})
export default function Doc() {
  return (
    <div className=''>
      <Editor/>
    </div>
  )
}
