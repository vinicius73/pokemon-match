const synth = window.speechSynthesis

const speak = async (text: string): Promise<void> => {
  if (!synth) {
    console.warn('no speechSynthesis')
    return
  }

  if (synth.speaking) {
    console.warn('speechSynthesis.speaking')
    return
  }

  const utterThis = new SpeechSynthesisUtterance(text)

  return new Promise((resolve, reject) => {
    utterThis.onend = () => {
      resolve()
    }
    utterThis.onerror = (event) => {
      reject(event)
    }

    // utterThis.voice = synth.

    utterThis.pitch = 1
    utterThis.rate = 0.9

    synth.speak(utterThis)
  })
}

export { speak }
