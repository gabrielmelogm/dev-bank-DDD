import { User } from "./user"

describe('User Unit Tests', () => {
  it('should create a new user', () => {
    const user = new User({
      id: '123',
      name: 'John Doe',
      email: 'john@mail.com'
    })

    expect(user.id).toBe('123')
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@mail.com')
  })
})