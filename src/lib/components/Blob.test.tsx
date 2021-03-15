import '@testing-library/jest-dom/extend-expect'

interface MyType {
  color: string
  value: number
  id: string
}

describe('Sample test', () => {
  test('it should mount', () => {
    const toto: MyType = {
      color: '#c0c0c0',
      value: 3,
      id: '123-xeab',
    }
    expect(toto.value).toEqual(3)
  })
})
