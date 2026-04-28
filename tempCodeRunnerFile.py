import matplotlib.pyplot as plt
import numpy as np

# ================= DATA =================
categories = ['Sangat Suka', 'Suka', 'Cukup Suka'] * 3

kersen = [10,23,56, 14,20,44, 10,40,34]
jambu  = [0,20,63, 10,37,23, 10,17,40]
alpukat= [17,43,37, 7,27,37, 7,33,24]
kelor  = [13,30,47, 7,27,40, 13,33,27]
kakao  = [17,47,27, 3,33,40, 17,53,20]

data = [kersen, jambu, alpukat, kelor, kakao]
labels_produk = ['Kersen', 'Jambu Biji', 'Alpukat', 'Kelor', 'Kakao']
colors = ['lightgray', 'red', 'green', 'purple', 'gold']

# ================= PLOT =================
x = np.arange(len(categories))
width = 0.15

fig, ax = plt.subplots(figsize=(14,8))
plt.subplots_adjust(top=0.65)

for i, d in enumerate(data):
    ax.bar(x + (i-2)*width, d, width, label=labels_produk[i], color=colors[i])

# ================= AXIS =================
ax.set_xticks(x)
ax.set_xticklabels(categories)
ax.set_ylabel('Persentase Jumlah Panelis yang Menilai (%)')

ax.axvline(2.5, color='black', linewidth=1)
ax.axvline(5.5, color='black', linewidth=1)

ax.text(1, -8, 'Warna', ha='center')
ax.text(4, -8, 'Aroma', ha='center')
ax.text(7, -8, 'Rasa', ha='center')

ax.grid(axis='y', linestyle='-', linewidth=0.3)
ax.legend(loc='center left', bbox_to_anchor=(1, 0.5), fontsize=9)
ax.set_ylim(0,70)

# ================= TABLE =================
table_data = [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', 'Kersen','Jambu Biji','Alpukat','Kelor','Kakao'],
    ['Warna','90%','83%','97%','90%','90%'],
    ['Aroma','77%','70%','70%','73%','77%'],
    ['Rasa','73%','67%','63%','73%','90%']
]

# 🔥 kolom dibuat simetris biar center bener
col_widths = [0.15, 0.17, 0.17, 0.17, 0.17, 0.17]

table = plt.table(
    cellText=table_data,
    cellLoc='center',
    loc='upper center',
    colWidths=col_widths,
    bbox=[0.3, 1.02, 0.4, 0.20]  # 🔥 lebih kecil & center
)

table.auto_set_font_size(False)
table.set_fontsize(8)
table.scale(1, 0.8)

# ================= STYLE =================
for (row, col), cell in table.get_celld().items():
    cell.set_edgecolor('black')
    cell.set_linewidth(1)

# kosongkan semua header kecuali tengah
for col in range(6):
    if col != 3:
        table[(0, col)].get_text().set_text('')
        table[(1, col)].get_text().set_text('')

# center text
table[(0,3)].get_text().set_ha('center')
table[(1,3)].get_text().set_ha('center')

# bold judul utama
table[(0,3)].get_text().set_weight('bold')

table[(0,3)].get_text().set_text(
    'Total Persentase Tingkat Kesukaan Panelis'
)

table[(1,3)].get_text().set_text(
    '(Sangat Suka + Suka + Cukup Suka)'
)

# ================= FAKE MERGE HEADER =================
for col in range(6):
    table[(0, col)].visible_edges = ''
    table[(1, col)].visible_edges = ''

for col in range(6):
    if col == 0:
        table[(0, col)].visible_edges = 'LT'
        table[(1, col)].visible_edges = 'LB'
    elif col == 5:
        table[(0, col)].visible_edges = 'RT'
        table[(1, col)].visible_edges = 'RB'
    else:
        table[(0, col)].visible_edges = 'T'
        table[(1, col)].visible_edges = 'B'

plt.show()