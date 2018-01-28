'use script'

function createAlertMessage({status, decision}) {
  if (status !== 'success') {
    return 'Error validating request'
  }
  return `Your order has been ${decision === 'approve' ? 'approved' : 'declined'}`
}

const orderInputs = document.getElementById('order-inputs')
const inputs = [
  ["name", "Full Name", "text"],
  ["email", "Email", "email"],
  ["phone", "Phone", "text"],
  ["address", "Address", "text"],
  ["cc", "Credit Card", "text", ['placeholder', 'Don\'t enter a real credit card']],
  ["cc-exp-month", "Expiry Month", "number", ['min', 1], ['max', 12]],
  ["cc-exp-year", "Expiry Year", "number", ['min', 2017]],
]
for (const [id, label, type, ...options] of inputs) {
  const attrs = options.map(([k, v]) => ` ${k}="${v}"`).join('')
  orderInputs.insertAdjacentHTML('beforeend', `
        <div class="controls">
          <label for="${id}">${label}</label>
          <input id="${id}" name="${id}" type="${type}" ${attrs} required>
        </div>`)
}
const orderForm = document.getElementById('order-form')
orderForm.addEventListener('submit', async e => {
  e.preventDefault()
  const response = await (await fetch('/order', {
    method: 'post',
    credentials: 'include',
    body: new FormData(orderForm)
  })).json()
  alert(createAlertMessage(response))
})
