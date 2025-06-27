import React from 'react'
import { useRouteError } from 'react-router'

export default function ErrorPage() {
    const error= useRouteError();
  return (
    <div>Something Went Wrong  the status is {error.status} </div>
  )
}
