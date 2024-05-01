import { Layout, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { MrbSplashScreen } from '../splashScreen'

const { useToken } = theme


export const MrbMain = ({ name, children }) => {
  const [isLoading, setLoading] = useState<boolean>(true)

  const { token } = useToken()

  useEffect(() => {
    if (isLoading) {
      setLoading(false)
    }
  }, [isLoading, setLoading])

  return (
    <Layout
      className="mrb-main"
      style={{ background: token.colorBgBase, color: token.colorTextBase }}
    >
      {isLoading ? <MrbSplashScreen name={name} /> : children}
    </Layout>
  )
}
