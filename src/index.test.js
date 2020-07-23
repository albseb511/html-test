import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom
let container


describe('index.html', () => {
    beforeEach(() => {
      // Constructing a new JSDOM with this option is the key
      // to getting the code in the script tag to execute.
      // This is indeed dangerous and should only be done with trusted content.
      // https://github.com/jsdom/jsdom#executing-scripts
      dom = new JSDOM(html, { runScripts: 'dangerously' })
      container = dom.window.document.body
    })
  
    it('renders a heading element', () => {
      expect(container.querySelector('h3')).not.toBeNull()
      expect(getByText(container, 'Counter')).toBeInTheDocument()
    })
  
    it('renders an ADD button element', () => {
      expect(container.querySelector('#add')).not.toBeNull()
      expect(container.querySelector('#reduce')).not.toBeNull()
      expect(container.querySelectorAll('button').length).toBe(2)
    })
    
    it('renders an ADD button element', () => {
        expect(getByText(container, 'ADD')).toBeInTheDocument()
        expect(getByText(container, 'REDUCE')).toBeInTheDocument()
    })

    if('inital count to be 1',()=>{
        expect( container.querySelector('#count').not.toBeNull() )
        expect( container.querySelector('#count').toBe(1) )
    })
  
    it('Adds 1 via JavaScript when the button is clicked', async () => {
      const add = getByText(container, 'ADD')
      const reduce = getByText(container, 'REDUCE')

      fireEvent.click(add)
      let count = container.querySelector('#count')
      expect(count.textContent).toBe('2')
  
      fireEvent.click(add)
      expect(count.textContent).toBe('3')

      fireEvent.click(reduce)
      expect(count.textContent).toBe('2')

    })
  })