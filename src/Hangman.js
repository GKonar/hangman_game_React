import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './words';
import img0 from './0.png';
import img1 from './1.png';
import img2 from './2.png';
import img3 from './3.png';
import img4 from './4.png';
import img5 from './5.png';
import img6 from './6.png';

class Hangman extends Component {
	static defaultProps = {
		images: [img0, img1, img2, img3, img4, img5, img6]
	};

	constructor(props) {
		super(props);
		this.state = {
			nWrong: 0,
			maxWrong: this.props.maxGuesses,
			guessed: new Set(),
			answer: 'apple' //randomWord()
		};
		this.handleGuess = this.handleGuess.bind(this);
		this.reset = this.reset.bind(this);
	}

	guessedWord() {
		/** if thers is a letter in guessed letters which includes letter from answer it show ups UI */
		return this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
	}

	/** handleGuess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */

	handleGuess(evt) {
		let ltr = evt.target.value;
		this.setState(st => ({
			guessed: st.guessed.add(ltr),
			nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
		}));
	}

	/**  Generate all ltr buttons in UI */
	generateButtons() {
		return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr, index) => (
			<button
				className="Hangman-ltrBtn"
				key={index}
				value={ltr}
				onClick={this.handleGuess}
				disabled={this.state.guessed.has(ltr)}
			>
				{ltr}
			</button>
		));
	}

	reset() {
		this.setState({
			nWrong: 0,
			guessed: new Set(),
			answer: 'apple' //randomWord()
		});
	}

	render() {
		const isPlaying = this.state.nWrong < this.state.maxWrong;
		let btns;
		if (isPlaying && this.guessedWord().includes('_')) {
			btns = this.generateButtons();
		} else if (isPlaying && !this.guessedWord().includes('_')) {
			btns = <span className="Hangman-msg">You win! Congrats!</span>;
		} else {
			btns = <span className="Hangman-msg">You Lose! Try again! &darr;</span>;
		}

		return (
			<div className="Hangman">
				<h1>Hangman</h1>
				<img
					src={this.props.images[this.state.nWrong]}
					alt={`${this.state.nWrong}/${this.state.maxWrong} wrong guesses`}
				/>
				<p className="Hangman-wrongNum">
					You have {this.state.nWrong} wrong guesses out of {this.state.maxWrong}
				</p>
				<p className="Hangman-word">{isPlaying ? this.guessedWord() : this.state.answer}</p>
				<p className="Hangman-btns">{btns}</p>
				<button onClick={this.reset} className="Hangman-resetBtn">
					RESET
				</button>
			</div>
		);
	}
}

export default Hangman;
