# Piggy Bank Tycoon

The BEST real estate clicker game ever made. Click the big Allowance piggy bank, buy properties from My Phone all the way up to My Dimension, give them glow-ups, and pay the Tax Man before he shows up.

## How to play

Open `index.html` in any web browser. That's it. Your progress saves in the browser automatically.

Keep `art.js` in the same folder as `index.html`. It holds the pictures for the job mini games.

## Jobs

Every property unlocks a job: a mini game in the Jobs list under the piggy bank. Each job can be done once every 5 minutes and pays 5 minutes of that property's money. Most jobs have a timer; if it runs out, you can try again right away for free.

## Changing the job pictures

The mini game pictures live in `img/` (`lawn.webp`, `room-clean.webp`, `room-messy.webp`, `paper-route.webp`). After replacing one, run `node tools/build-art.js` to rebuild `art.js`. The room game finds the mess by comparing the clean and messy room pictures, so both need to be the same scene, lined up the same way. The paper route game cuts the paperboy, mailbox and newspaper out of its picture at fixed spots, so a different picture there would need those spots changed in `index.html` (look for `PR =`).

## Test version

Open `test.html` to play a version where everything costs $0 (properties, upgrades, glow-ups, helpers and firing). It has its own save, so it never touches your real game. It's built from `index.html`, so after changing the game, run `node tools/build-test.js` to update it.
