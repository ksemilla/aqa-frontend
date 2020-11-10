import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

import { Container } from "./../../styles/Containers"
import { CursorPointer } from "./../../styles/elements/CursorPointer"
import { Input } from "./../../styles/elements/Input"

import UserService from "./../../api/User"

function EmployeeForm({ data, onSubmit, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>Username</div>
        <Input name="username" value={data.username} onChange={onChange} required />
      </div>
      <div>
        <div>Email</div>
        <Input name="email" value={data.email} onChange={onChange} required />
      </div>
      <div>
        <div>Password</div>
        <Input name="password" value={data.password} onChange={onChange} />
      </div>
      <hr />
      <div>
        <div>Scope</div>
        <select name="scope" value={data.scope} onChange={onChange}>s
          <option value="ae">Application Engineer</option>
          <option value="se">Sales Engineer</option>
          <option value="sl">Sales Lead</option>
          <option value="bh">Business Unit Head</option>
          <option value="scm">Supply Chain</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <div>First Name</div>
        <Input name="first_name" value={data.first_name} onChange={onChange} required />
      </div>

      <div>
        <div>Last Name</div>
        <Input name="last_name" value={data.last_name} onChange={onChange} required />
      </div>

      <button type="submit">Save</button>
    </form>
  )
}

export default EmployeeForm
