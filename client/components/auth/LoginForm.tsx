import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LoginForm: React.FC = () => {
    return (
        <form className="bg-slate-900 border border-border rounded-xl p-8 w-full max-w-md mx-auto shadow-lg" aria-label="Formulario de inicio de sesión">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Iniciar sesión</h2>
            <div className="mb-5">
                <label htmlFor="login-email" className="block text-sm font-medium text-white mb-2">
                    Email
                </label>
                <Input
                    id="login-email"
                    type="email"
                    placeholder="tu@email.com"
                    aria-label="Correo electrónico"
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="login-password" className="block text-sm font-medium text-white mb-2">
                    Contraseña
                </label>
                <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    aria-label="Contraseña"
                    required
                />
            </div>
            <div className="flex items-center mb-5">
                <input
                    id="remember-me"
                    type="checkbox"
                    className="mr-2 rounded border-border focus:ring-primary"
                />
                <label htmlFor="remember-me" className="text-sm text-gray-300">
                    Recordarme
                </label>
            </div>
            <Button type="submit" className="w-full" aria-label="Iniciar sesión">
                Iniciar sesión
            </Button>
            <div className="mt-6 text-center">
                <a href="/sign-up" className="text-primary hover:underline text-sm">¿No tienes cuenta? Regístrate</a>
            </div>
            <div className="mt-8">
                <hr className="border-border mb-4" />
                <p className="text-gray-400 text-center text-sm mb-4">O inicia sesión con</p>
                <div className="flex flex-col gap-2">
                    <Button type="button" variant="outline" className="w-full" aria-label="Iniciar sesión con Google">
                        <img src="/assets/images/icons/google.png" alt="Google" className="inline-block w-5 h-5 mr-2 align-middle" /> Google
                    </Button>
                    <Button type="button" variant="outline" className="w-full" aria-label="Iniciar sesión con Facebook">
                        <img src="/assets/images/icons/facebook.png" alt="Facebook" className="inline-block w-5 h-5 mr-2 align-middle" /> Facebook
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
