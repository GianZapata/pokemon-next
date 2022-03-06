import { FC, CSSProperties, SetStateAction, Dispatch } from 'react'
import Head from 'next/head'

import { Navbar } from '../ui'
import { SmallPokemon } from '../../interfaces/pokemon-list';

interface MainLayoutProps { 
   title?: string
}

const mainStyles : CSSProperties = {
	padding: '0 20px',
}

export const MainLayout : FC<MainLayoutProps> = ({ children, title }) => {

	const origin = (typeof window === 'undefined') ? '' : window.location.origin		

	return (
		<>
			<Head>
				<title>{ title || 'Pokemon App' }</title>
				<meta  name="author" content="``Gian Carlo Zapata"/>
				<meta  name="description" content={`Información sobre el pokemon ${ title } `}/> 
				<meta  name="keywords" content={`${ title }, pokemon, pokemón, pokedex`} />
				<meta property="og:title" content={`Información sobre el pokemon ${ title } `} />
				<meta property="og:description" content={`Esta es la página sobre ${ title }`} />
				<meta property="og:image" content={`${ origin }/banner.png`} />
			</Head>

			<Navbar/>

			<main style={ mainStyles }>
				{ children }
			</main>
		</>
	)
}
