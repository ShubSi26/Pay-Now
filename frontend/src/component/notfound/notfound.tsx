export default function Notfound() {
    return <div className="bg-gray-900 text-white flex items-center justify-center h-screen">
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Lost in Space</h1>
            <p className="text-xl mb-6">Houston, we have a problem!</p>
            <p className="mb-6">It looks like the page you’re seeking has drifted into the vast expanse of the internet.</p>
            <div className="mb-6">
                <p className="mb-2">🚀 <strong>Check the URL:</strong> Maybe a typo has sent you into orbit.</p>
                <p className="mb-2">🌍 <strong>Return to Earth:</strong> Head back to the <a href="." className="text-blue-500 hover:underline">homepage</a>.</p>
                <p className="mb-2">🔭 <strong>Explore:</strong> Use the search bar to find your way.</p>
            </div>
            <div className="mt-6">
                <p className="text-lg mb-2">While you're here, enjoy a cosmic joke:</p>
                <p className="text-lg font-semibold">Why did the astronaut break up with the webpage?</p>
                <p className="text-lg italic">Because it needed some space!</p>
            </div>
        </div>
    </div>
}