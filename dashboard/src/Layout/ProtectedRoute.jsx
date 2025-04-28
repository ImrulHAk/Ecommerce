import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const ProtectedRoute = ({ children }) => {
    let baseurl = import.meta.env.VITE_API_BASE_URL
    const token = JSON.parse(localStorage.getItem('admin_token'))
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        if (!token) {
            navigate("/signin");
            return;
        }

        axios.get(`${baseurl}/auth/verify-token`, {
            headers: {
                Authorization: `${token}`,
            }
        }).then((res) => {
            setIsAuth(true)
        }).catch((err) => {
            setIsAuth(false)
            navigate('/signin')
        });
    }, [token, baseurl, navigate])
    if (isAuth == null) return null;
    if (isAuth == false) return null;
    return (
        <>{children}</>
    )
}

export default ProtectedRoute