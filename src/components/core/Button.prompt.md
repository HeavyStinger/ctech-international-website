HUD-style button; use `primary` (solid cyan, dark text) for the single highest-priority action per view, `secondary` (outline-glow) for lower-emphasis CTAs like "Book a Consultation", `ghost` for tertiary.

```jsx
<Button variant="secondary" size="lg">Book a Consultation</Button>
```

Never pill-shaped; radius stays at var(--radius-control). Hover intensifies glow, no scale.
