import React from 'react'

const PageLayout = ({children}) => {
  return (
    <div className='container p-4 mx-auto'>
        {children}
    </div>
  )
}

export default PageLayout