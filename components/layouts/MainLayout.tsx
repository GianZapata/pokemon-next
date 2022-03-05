import { FC, CSSProperties } from 'react'

import Head from 'next/head'
import { Navbar } from '../ui'

interface MainLayoutProps { 
   title?: string
}

const mainStyles : CSSProperties = {
	padding: '0 20px',
}

export const MainLayout : FC<MainLayoutProps> = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{ title || 'Pokemon App' }</title>
				<meta  name="author" content="``Gian Carlo Zapata"/>
				<meta  name="description" content={`Información sobre el pokemon ${ title } `}/> 
				<meta  name="keywords" content={`${ title }, pokemon, pokemón, pokedex`} />
			</Head>

			<Navbar/>

			<main style={ mainStyles }>
				{ children }
			</main>
		</>
	)
}
