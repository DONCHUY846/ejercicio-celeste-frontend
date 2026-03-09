import { api } from '@/lib/api'

export type SendOtpPayload = {
  email: string
}

export type VerifyOtpPayload = {
  email: string
  otp: string
}

export const sendOtp = async (data: SendOtpPayload): Promise<{ message: string }> => {
  return api('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const verifyOtp = async (data: VerifyOtpPayload): Promise<{ message: string }> => {
  return api('/auth/verify-otp-reset', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
