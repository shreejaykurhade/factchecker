import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, ShieldAlert, Database, Lock, Search } from 'lucide-react';
import Footer from '../components/Footer';

const Landing = () => {
    return (
        <div className="landing-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1rem', right: '2rem', zIndex: 100 }}>
                <Link to="/login">
                    <button className="brutal-btn" style={{ fontSize: '1rem', padding: '0.5rem 1.5rem', background: 'white', color: 'black' }}>
                        LOGIN
                    </button>
                </Link>
            </div>

            <header className="hero-section container fade-in" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                <div className="brutal-box" style={{
                    border: '5px solid black',
                    padding: '4rem 2rem',
                    background: 'var(--bg-color)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>

                    <h1 className="hero-title">
                        DECODE THE <span style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>MEDIA</span> MATRIX.
                    </h1>
                    <h2 style={{ fontSize: '2rem', marginTop: '1rem', color: '#555' }}>
                        Autonomous. Unbiased. Real-time.
                    </h2>

                    <p className="hero-subtitle" style={{ fontSize: '1.2rem', maxWidth: '800px', lineHeight: '1.6', marginTop: '2rem' }}>
                        In an era of deepfakes and viral misinformation, <strong>TruthGigs</strong> is your digital defense system.
                        We deploy autonomous AI agents to scour trusted Indian databases, cross-reference government records (PIB),
                        and analyze news patterns to give you a definitive Truth Score.
                    </p>

                    <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/login">
                            <button className="brutal-btn" style={{ fontSize: '1.3rem', background: 'black', color: 'white' }}>
                                SEARCH YOUR QUERY <ArrowRight style={{ marginLeft: '10px' }} />
                            </button>
                        </Link>
                        <a href="#how-it-works">
                            <button className="brutal-btn" style={{ background: 'white', color: 'black' }}>
                                HOW IT WORKS
                            </button>
                        </a>
                    </div>
                </div>
            </header>

            <section id="how-it-works" className="features-section container slide-in-left" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>// SYSTEM ARCHITECTURE</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="brutal-box" style={{ borderLeft: '10px solid var(--secondary-color)' }}>
                        <Search size={48} color="var(--secondary-color)" />
                        <h3 style={{ marginTop: '1rem' }}>1. INVESTIGATOR</h3>
                        <p>
                            Our agent crawls valid Indian domains: <code>boomlive.in</code>, <code>altnews.in</code>, <code>pib.gov.in</code>.
                            It ignores noise and focuses on verified archives.
                        </p>
                    </div>

                    <div className="brutal-box" style={{ borderLeft: '10px solid var(--accent-color)' }}>
                        <Database size={48} color="var(--accent-color)" />
                        <h3 style={{ marginTop: '1rem' }}>2. ANALYST</h3>
                        <p>
                            Powered by <strong>Gemini 1.5 Flash</strong>. It reads thousands of words in seconds to find contradictions
                            and context that humans might miss.
                        </p>
                    </div>

                    <div className="brutal-box" style={{ borderLeft: '10px solid var(--highlight-color)' }}>
                        <Lock size={48} color="var(--highlight-color)" />
                        <h3 style={{ marginTop: '1rem' }}>3. GRADER</h3>
                        <p>
                            We don't just say True/False. We give you a <strong>Trust Score (0-100)</strong> using a proprietary algorithm
                            based on source authority and recency.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Landing;
