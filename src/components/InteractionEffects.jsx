
import { useEffect, useRef } from 'react'

export default function InteractionEffects(){
  const canvasRef = useRef(null)

  useEffect(()=>{
    const canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '9999'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.body.appendChild(canvas)
    canvasRef.current = canvas
    const ctx = canvas.getContext('2d')

    let trails = []
    let raf = null

    function onResize(){
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    function onMove(e){
      trails.push({ x: e.clientX, y: e.clientY, life: 1.0, size: 10 + Math.random()*6, alpha: 0.9 })
      if(trails.length > 160) trails.shift()
    }
    window.addEventListener('mousemove', onMove)

    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height)
      for(let i=0;i<trails.length;i++){
        const p = trails[i]
        ctx.save()
        const ageFactor = 1 - (i / trails.length)
        const a = p.alpha * ageFactor * 0.9
        const size = p.size * (0.6 + ageFactor*0.8)
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size)
        gradient.addColorStop(0, `rgba(34,211,238,${a})`)
        gradient.addColorStop(0.4, `rgba(34,211,238,${a*0.5})`)
        gradient.addColorStop(1, `rgba(34,211,238,0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(p.x - size, p.y - size, size*2, size*2)
        ctx.restore()
        p.life -= 0.02 + (i/trails.length)*0.006
      }
      trails = trails.filter(t => t.life > 0)
      raf = requestAnimationFrame(draw)
    }
    draw()

    function handleClick(e){
      const el = e.target.closest('.ripple-effect')
      if(!el) return
      const rect = el.getBoundingClientRect()
      const ripple = document.createElement('span')
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size/2
      const y = e.clientY - rect.top - size/2
      ripple.className = 'neon-ripple'
      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = x + 'px'
      ripple.style.top = y + 'px'
      el.appendChild(ripple)
      setTimeout(()=>ripple.remove(),650)
    }
    document.addEventListener('click', handleClick)

    function handleScroll(){
      const y = window.scrollY
      document.querySelectorAll('[data-parallax]').forEach(el=>{
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.05
        el.style.transform = `translateY(${y*speed}px)`
      })
    }
    document.addEventListener('scroll', handleScroll, { passive: true })

    return ()=>{
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('scroll', handleScroll)
      if(raf) cancelAnimationFrame(raf)
      if(canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  },[])

  return null
}
