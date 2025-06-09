'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const scrolled = useScrollHeader();
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={!isHomePage || scrolled ? 'scrolled' : ''}>
            <div id="cabecalho">
                <div className="col-logo">
                    <Link href="/">
                        <Image
                            id="logo"
                            src={!isHomePage || scrolled ? "/img/logo-bem-no-frio.png" : "/img/logo-bem-no-frio-branco.png"}
                            width={210}
                            height={50}
                            alt="logo EcoLevel"
                        />
                    </Link>
                </div>
                <button
                    className={`menu-hamburguer ${menuOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Menu mobile"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={`col-menu ${menuOpen ? 'open' : ''}`}>
                    <nav className="menu">
                        <ul>
                            <li><Link href="/">Início</Link></li>
                            <li><Link href="/#sobre-nos">Sobre</Link></li>
                            <li><Link href="/#funcionamento">Como funciona</Link></li>
                            <li><Link href="/#equipe">Equipe</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="interativos">
                    <Link href="/#inscricao" className="btn cta-menu">Cadastrar-se</Link>
                </div>
            </div>
        </header>
    );
}