countie
===

Watcher that auto-renames `x.png` to `x_1.png` or `x_48.png` to help with quick repetitive saving

```
npm install -g
countie
```

Now that countie is running, if some application saves `bar.txt` to the working directory, countie will rename it to `bar_1.txt`. If a new file is again created at `bar.txt`, this new file will be renamed to `bar_2.txt`.

Add a glob to limit what gets renamed:


```
countie *.png
```
