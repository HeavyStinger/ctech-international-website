Modal dialog on a dark scrim (no blur).

```jsx
<Dialog open={open} onClose={close} title="Book a Consultation"
  footer={<><Button variant="ghost" onClick={close}>Cancel</Button><Button>Confirm</Button></>}>
  We'll call you within 1 business day.
</Dialog>
```
