import React, { useState } from 'react'
import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useUserActions } from '../hooks/useUserActions'

export function CreateNewUser () {
  const { addUser } = useUserActions()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResult(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) return setResult('ko')

    addUser({ name, email, github })
    setResult('ok')
    form.reset()
  }

  return (
      <Card style={{ marginTop: '16px' }}>
          <Title>Create new User</Title>

          <form onSubmit={handleSubmit} action="">
              <TextInput className='mt-2' name='name' placeholder='Aqui el nombre' type='text'/>
              <TextInput className='mt-2' name='email' placeholder='Aqui el email' type='email'/>
              <TextInput className='mt-2' name='github' placeholder='Aqui el usuario de GitHub ' type='text'/>

            <div>
              <Button type='submit' style={{ marginTop: '16px', backgroundColor: '#eee' }}>Crear un usuario</Button>

              <span>
              {result === 'ok' && <Badge style={{ marginLeft: '10px', backgroundColor: '#90EE90', borderRadius: '20%', color: '#006400' }}>Usuario creado con exito</Badge>}
              {result === 'ko' && <Badge style={{ marginLeft: '10px', backgroundColor: '#fbebea', borderRadius: '20%', color: '#b91c1c' }}>Error al crear el usuario</Badge>}
              </span>

            </div>
         </form>

    </Card>
  )
}
