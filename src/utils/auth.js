// Token 管理工具
import axios from 'axios'

// 获取 token
export function getToken() {
  return localStorage.getItem('token')
}

// 设置 token
export function setToken(token) {
  return localStorage.setItem('token', token)
}

// 移除 token
export function removeToken() {
  return localStorage.removeItem('token')
}

// 验证 token 是否有效
export async function validateToken() {
  const token = getToken()
  if (!token) return false

  try {
    // 向服务端发送请求验证 token
    const response = await axios.post('/api/validate_token', {
      token: token
    })
    
    return response.data.code === '200'
  } catch (error) {
    console.error('Token validation failed:', error)
    return false
  }
}

// 检查是否已登录
export async function isAuthenticated() {
  return await validateToken()
} 