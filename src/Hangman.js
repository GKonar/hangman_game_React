import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './words';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

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
			answer: randomWord()
		};
		this.handleGuess = this.handleGuess.bind(this);
		this.reset = this.reset.bind(this);
	}

	guessedWord() {
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
			maxWrong: this.props.maxGuesses,
			guessed: new Set(),
			answer: randomWord()
		});
	}

	render() {
		let btns = this.state.nWrong < this.state.maxWrong ? this.generateButtons() : 'You Lose!';
		let word = this.state.nWrong < this.state.maxWrong ? this.guessedWord() : this.state.answer;
		return (
			<div className="Hangman">
				<h1>Hangman</h1>
				<img
					src={this.props.images[this.state.nWrong]}
					alt={`${this.state.nWrong}/${this.state.maxWrong} wrong guesses`}
				/>
				<p className="Hangman-wrongNum">
					You have {this.state.nWrong} wrong guesses out of {this.state.maxWrong} chances
				</p>
				<p className="Hangman-word">{word}</p>
				<p className="Hangman-btns">{btns}</p>
				<button onClick={this.reset} className="Hangman-resetBtn">
					RESET
				</button>
			</div>
		);
	}
}

export default Hangman;
