
function useSnow () {
  const canvasEle = document.createElement('canvas')
  canvasEle.id = 'canvas'
  canvasEle.width = window.innerWidth
  canvasEle.height = window.innerHeight
  const $ = canvasEle.getContext('2d')
  document.body.append(canvasEle)
  return {
    $
  }
}

export default useSnow
