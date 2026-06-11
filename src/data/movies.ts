export interface Movie {
  id: number
  title: string
  year: number
  /** Letterboxd short link */
  boxd: string
  /** Poster image URL (baked in). null = no poster found; UI shows a text card. */
  poster: string | null
}

const TMDB = (hash: string) => `https://image.tmdb.org/t/p/w500/${hash}.jpg`

// Source list: ~19 themed weeks of movie picks. The tier list treats them as one
// flat pool — drag any film into a tier, or leave it in "Missed that week".
export const MOVIES: Movie[] = [
  { id: 1, title: 'The Lord of the Rings', year: 1978, boxd: 'https://boxd.it/2b5k', poster: TMDB('liW0mjvTyLs7UCumaHhx3PpU4VT') },
  { id: 2, title: 'The Return of the King', year: 1980, boxd: 'https://boxd.it/28V8', poster: TMDB('lTwUT4NsSyUQlHV20Mx3C96JHq4') },
  { id: 3, title: 'Hoodwinked!', year: 2005, boxd: 'https://boxd.it/1UVS', poster: TMDB('kwPl1AKX4BLxrh5PCkrwYWeEV5I') },
  { id: 4, title: 'Labyrinth', year: 1986, boxd: 'https://boxd.it/1POC', poster: TMDB('hbSdA1DmNA9IlfVoqJkIWYF2oYm') },
  { id: 5, title: 'The Cat in the Hat', year: 2003, boxd: 'https://boxd.it/1VSU', poster: TMDB('uYYLz67e5xEQMsY858VSSCDsLU6') },
  { id: 6, title: 'Cats & Dogs', year: 2001, boxd: 'https://boxd.it/1UUq', poster: TMDB('wUWoat7L4vvQburQ8pVEJhRG9L5') },
  { id: 7, title: 'The Cat from Outer Space', year: 1978, boxd: 'https://boxd.it/1Fce', poster: TMDB('jspJBPlYGuMlwLbSSo0hdgfbnY0') },
  { id: 8, title: 'Cats', year: 2019, boxd: 'https://boxd.it/jydK', poster: TMDB('aCNch5FmzT2WaUcY44925owIZXY') },
  { id: 9, title: 'Wonka', year: 2023, boxd: 'https://boxd.it/tCQm', poster: TMDB('qhb1qOilapbapxWQn9jtRCMwXJF') },
  { id: 10, title: 'Camp Rock', year: 2008, boxd: 'https://boxd.it/1PHw', poster: TMDB('7IXMqZnwccogptThay3togKIFWw') },
  { id: 11, title: 'Repo! The Genetic Opera', year: 2008, boxd: 'https://boxd.it/1Ogu', poster: TMDB('2G5LczM1clXu3byEudWk9w0KDYD') },
  { id: 12, title: 'Rock & Rule', year: 1983, boxd: 'https://boxd.it/1C2K', poster: TMDB('rXXxITGJdiJEvk5c2Z1La1LNbpi') },
  { id: 13, title: 'Dunston Checks In', year: 1996, boxd: 'https://boxd.it/1II8', poster: TMDB('xR2cWC04kWNr7TBeXNOf4uOqn00') },
  { id: 14, title: 'Planet of the Apes', year: 1968, boxd: 'https://boxd.it/29p8', poster: TMDB('2r9iKnlSYEk4daQadsXfcjHfIjQ') },
  { id: 15, title: 'Better Man', year: 2024, boxd: 'https://boxd.it/u6t8', poster: TMDB('fbGCmMp0HlYnAPv28GOENPShezM') },
  { id: 16, title: 'MVP 2: Most Vertical Primate', year: 2001, boxd: 'https://boxd.it/BpG', poster: TMDB('pPk31fkbAGwwMG2Ylk6629NZ1ui') },
  { id: 17, title: 'The Last Airbender', year: 2010, boxd: 'https://boxd.it/1WQK', poster: TMDB('kl9JJ8288bNsY8oqT1SpQh1w2mb') },
  { id: 18, title: 'Death Note', year: 2017, boxd: 'https://boxd.it/bOS4', poster: TMDB('8xRQ0KG9ZZzjEiFa5fgEaTKhc0d') },
  { id: 19, title: 'Steamboy', year: 2004, boxd: 'https://boxd.it/1ZvA', poster: TMDB('wszfXaMx74a91yRTBgO1fwSvMj3') },
  { id: 20, title: 'Redline', year: 2009, boxd: 'https://boxd.it/2pQ0', poster: TMDB('yUkH0y9OsY7J08Dvfzi1P0di559') },
  { id: 21, title: 'Dune', year: 1984, boxd: 'https://boxd.it/29tY', poster: TMDB('4kJmUCE7mkVJjXa7A0g2rY4IGTm') },
  { id: 22, title: 'The Lone Ranger', year: 2013, boxd: 'https://boxd.it/ngU', poster: TMDB('yDuJGq8biNMW7zM3w95UaDJv0KG') },
  { id: 23, title: 'Holes', year: 2003, boxd: 'https://boxd.it/20mE', poster: TMDB('o2Dm2mcE1qW8vT0bpsJO5OMBbqa') },
  { id: 24, title: 'The Prince of Egypt', year: 1999, boxd: 'https://boxd.it/qiow', poster: TMDB('2xUjYwL6Ol7TLJPPKs7sYW5PWLX') },
  { id: 25, title: 'The Avengers', year: 1998, boxd: 'https://boxd.it/1YYG', poster: TMDB('1p5thyQ4pCy876HpdvFARqJ62N9') },
  { id: 26, title: 'Spy Kids', year: 2001, boxd: 'https://boxd.it/1Xcw', poster: TMDB('j3rUkHIAAoKr6jU30q3Db4fcIF9') },
  { id: 27, title: 'The Master of Disguise', year: 2002, boxd: 'https://boxd.it/1Pai', poster: TMDB('JFKuKJeHHFFVb0ubpkPIXmkIOg') },
  { id: 28, title: 'G-Force', year: 2009, boxd: 'https://boxd.it/1ETc', poster: TMDB('9Tly3ZXTTsQKM26fis8v9LR4GxG') },
  { id: 29, title: 'Austin Powers: The Spy Who Shagged Me', year: 1999, boxd: 'https://boxd.it/29xQ', poster: TMDB('jiF7UShERJFn5RtgfBK2lIJrOTc') },
  { id: 30, title: "Help! I'm a Fish", year: 2000, boxd: 'https://boxd.it/1RAs', poster: TMDB('s9yFQD19xJqXEnAnUAZFUan25DJ') },
  { id: 31, title: "Surf's Up", year: 2007, boxd: 'https://boxd.it/1YKY', poster: TMDB('kAeZfUDmuhnL8pLnxxFxBhYVdm6') },
  { id: 32, title: 'The SpongeBob SquarePants Movie', year: 2004, boxd: 'https://boxd.it/1SYq', poster: TMDB('1rvzKV1d18EbDVaEd4VDzK3cgnY') },
  { id: 33, title: 'Shark Tale', year: 2004, boxd: 'https://boxd.it/1VYe', poster: TMDB('r08DpyPyhXcJTfNZAICNGMzcQ8l') },
  { id: 34, title: 'Shrek', year: 2001, boxd: 'https://boxd.it/29zi', poster: TMDB('iB64vpL3dIObOtMZgX3RqdVdQDc') },
  { id: 35, title: 'Shrek 2', year: 2004, boxd: 'https://boxd.it/29z8', poster: TMDB('2yYP0PQjG8zVqturh1BAqu2Tixl') },
  { id: 36, title: 'Shrek the Third', year: 2007, boxd: 'https://boxd.it/29yY', poster: TMDB('n4SexGGQzI26E269tfpa80MZaGV') },
  { id: 37, title: 'Shrek Forever After', year: 2010, boxd: 'https://boxd.it/1WRo', poster: TMDB('6HrfPZtKcGmX2tUWW3cnciZTaSD') },
  { id: 38, title: 'Megalopolis', year: 2024, boxd: 'https://boxd.it/lPBS', poster: TMDB('8Sok3HNA3r1GHnK2lCytHyBz1A') },
  { id: 39, title: 'Waterworld', year: 1995, boxd: 'https://boxd.it/1XLG', poster: TMDB('X4UyUO5jgzs3c5YafnmYKLKKYw') },
  { id: 40, title: 'John Carter', year: 2012, boxd: 'https://boxd.it/FQ2', poster: TMDB('lCxz1Yus07QCQQCb6I0Dr3Lmqpx') },
  { id: 41, title: 'The Mummy', year: 2017, boxd: 'https://boxd.it/8HnW', poster: TMDB('zxkY8byBnCsXodEYpK8tmwEGXBI') },
  { id: 42, title: 'The Crow', year: 1994, boxd: 'https://boxd.it/1Yxq', poster: TMDB('rMMB3v6jYHjsvXRNJYESacoTD7j') },
  { id: 43, title: "Heaven's Burning", year: 1997, boxd: 'https://boxd.it/2taC', poster: TMDB('j7l2BgeJCNhiFwRrK5p5FhjliG5') },
  { id: 44, title: 'The Birds', year: 1963, boxd: 'https://boxd.it/2a6m', poster: TMDB('eClg8QPg8mwB6INIC4pyR5pAbDr') },
  { id: 45, title: 'Blackbird', year: 2018, boxd: 'https://boxd.it/jr4Q', poster: TMDB('i46iwhgdutOvD1TttQBYXnZ4c1p') },
  { id: 46, title: 'Wild West Christmas', year: 2025, boxd: 'https://boxd.it/YxHQ', poster: TMDB('yesQBnSmjhNbMnyzCWWFZ6DioeJ') },
  { id: 47, title: 'Hot Frosty', year: 2024, boxd: 'https://boxd.it/NeBM', poster: TMDB('waW6R5WJQSxq65gwBkvnKlseU6n') },
  { id: 48, title: 'The Grinch', year: 2018, boxd: 'https://boxd.it/chpK', poster: TMDB('smxA8yvZ0LzDPer9BIRd4pyOpx1') },
  { id: 49, title: 'The Da Vinci Code', year: 2006, boxd: 'https://boxd.it/2a3i', poster: TMDB('9ejKfNk0LBhSI9AahH4f9NJNZNM') },
  { id: 50, title: 'Machete', year: 2010, boxd: 'https://boxd.it/1yXW', poster: TMDB('dcPSm1rGEFdiEc7DaKz0t5kb66b') },
  { id: 51, title: 'The Simpsons Movie', year: 2007, boxd: 'https://boxd.it/6YU', poster: TMDB('s3b8TZWwmkYc2KoJ5zk77qB6PzY') },
  { id: 52, title: 'Attack of the 50 Foot Woman', year: 1958, boxd: 'https://boxd.it/1Gq2', poster: TMDB('y661j8lD78zuV2sDGF5uc6nU7KF') },
  { id: 53, title: 'Shaolin Soccer', year: 2001, boxd: 'https://boxd.it/1T86', poster: TMDB('z6ZQqwoxWy9muIxwUP4K2zWw7BU') },
  { id: 54, title: 'Smallfoot', year: 2018, boxd: 'https://boxd.it/fUCE', poster: TMDB('zfaiO7QgpcvR8XDOMokWLRfKeTE') },
  { id: 55, title: 'Footloose', year: 1984, boxd: 'https://boxd.it/288A', poster: TMDB('9JEDjBCXCx3eKTSkXwispf0UN3O') },
  { id: 56, title: 'Five Children and It', year: 2004, boxd: 'https://boxd.it/1JFO', poster: TMDB('qjRlksMO0bDgWVMXqViSj1SNY2r') },
  { id: 57, title: 'The 3 Worlds of Gulliver', year: 1960, boxd: 'https://boxd.it/1FXa', poster: TMDB('1Zdbxszx6CL1SyZJwlScPMQbEMm') },
  { id: 58, title: 'The 5,000 Fingers of Dr. T.', year: 1953, boxd: 'https://boxd.it/1eUo', poster: TMDB('5sAxThhLhsQSf4mjrIGHqfKlaAy') },
  { id: 59, title: 'Snow White', year: 2025, boxd: 'https://boxd.it/fVuc', poster: TMDB('oLxWocqheC8XbXbxqJ3x422j9PW') },
  { id: 60, title: 'Leprechaun 4: In Space', year: 1996, boxd: 'https://boxd.it/1Fm4', poster: TMDB('2nt0095grCSepz6xU24a5yP5mwc') },
  { id: 61, title: 'Lunopolis', year: 2010, boxd: 'https://boxd.it/2TGa', poster: TMDB('cR6VwJNlS8OVQI7NMXylQwbkYSi') },
  { id: 62, title: 'Troll Hunter', year: 2010, boxd: 'https://boxd.it/NQY', poster: TMDB('v2W5NEz0p9jPFzbbYt0dP86gsOX') },
  { id: 63, title: 'Chronicle', year: 2012, boxd: 'https://boxd.it/2Emk', poster: TMDB('kdyrdFIt29FUmLIKvedAc2j4rpo') },
  { id: 64, title: 'Spider-Man', year: 2002, boxd: 'https://boxd.it/2a8i', poster: TMDB('kjdJntyBeEvqm9w97QGBdxPptzj') },
  { id: 65, title: 'They Live', year: 1988, boxd: 'https://boxd.it/20lm', poster: TMDB('ngnybFTuopfbfmmEeX9jjBQQmF6') },
  { id: 66, title: 'FRED: The Movie', year: 2010, boxd: 'https://boxd.it/OAi', poster: TMDB('u9V734PuiqbcvOFZwBoYZDqiMTA') },
  { id: 67, title: 'Iron Sky: The Coming Race', year: 2019, boxd: 'https://boxd.it/9CPo', poster: TMDB('l5t2Nf1F7iQUKTrODg93xmQzZLj') },
  { id: 68, title: 'Bad Moon', year: 1996, boxd: 'https://boxd.it/FfU', poster: TMDB('1RobAQaPIYV2PBmkb4XISbsQZPe') },
]
