import api from './api'

const signatureService = {
  uploadSignature: async (visitorId, blob) => {
    const form = new FormData()
    form.append('signature', blob, 'signature.png')
    const res = await api.post(`/v1/visiteurs/${visitorId}/signature`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  },
}

export default signatureService
