import { useMutation } from '@tanstack/react-query'
import { sendOtp, verifyOtp } from '../api/recovery'
import type { SendOtpPayload, VerifyOtpPayload } from '../api/recovery'

export const useSendOtpMutation = () => {
  return useMutation({
    mutationFn: (data: SendOtpPayload) => sendOtp(data),
  })
}

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpPayload) => verifyOtp(data),
  })
}
