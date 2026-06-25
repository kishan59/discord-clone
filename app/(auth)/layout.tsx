const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex bg-red-500 h-full">
            {children}
        </div>
    )
}

export default AuthLayout;