export function getTheme(){
  return (typeof window !== 'undefined' && localStorage.getItem('theme')) 
    || (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}
export function setTheme(t: 'dark'|'light'){
  if(typeof window === 'undefined') return
  localStorage.setItem('theme', t)
  document.documentElement.classList.toggle('dark', t === 'dark')
}
