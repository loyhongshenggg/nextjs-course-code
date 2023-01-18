import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Navigate to one of these sites!</h1>
        <ul>
            <li>
                <a href="/portfolio">Portfolio</a> {/*This is not recommended because any application state in our running react app will be lost! */}
            </li>
            <li>
                <Link href="/portfolio">Portfolio </Link> {/*This is recommended=, it won't send http request, thus maintaining app states */}
            </li>
            <li>
                <Link href="/clients">Clients</Link>
            </li>
        </ul>
    </div>
  )
}

