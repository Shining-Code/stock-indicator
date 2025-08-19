## Quy ước thuật ngữ  

- `MA(C,x)`: Giá trị MA(x) ở giá khớp gần nhất ngày t (hiện tại).  
- `Ref(C,-1)`: Giá đóng cửa của cổ phiếu ở ngày t-1  
- `Ref(MA(C,x),-1)`: Giá trị MA(x) ở đóng cửa ngày t-1  
- `MACD(12,26)`: Đường MACD (12,26) ở ngày t (hiện tại)  
- `Signal(12,26,9)`: Đường tín hiệu (EMA9 của MACD) ở ngày t (hiện tại)  
- `Ref(MACD(12,26),-1)`: Đường MACD ở đóng cửa ngày t-1  
- `Ref(Signal(12,26,9),-1)`: Đường tín hiệu ở đóng cửa ngày t-1  

---

## Cách tính Xu thế & Tín hiệu  

### 1. Theo chỉ báo **MA9**

- Nếu chưa đủ dữ liệu → hiển thị `"-"`  
- Nếu đủ dữ liệu → tính theo logic:

| Điều kiện (VI) | Xu thế & Tín hiệu (EN) | Màu sắc | Công thức |
|----------------|-------------------------|---------|-----------|
| Đường giá cắt MA9 từ dưới lên | Tín hiệu Mua | Xanh đậm | `Avg(Vol(10) > 100000 AND Ref(C,-1)<Ref(MA(C,9),-1) AND C>MA(C,9))` |
| Giá trên MA9  | Xu thế Tăng | Xanh | `Avg(Vol(10) > 100000 AND Ref(C,-1)>Ref(MA(C,9),-1) AND C>MA(C,9))` |
| Đường giá cắt MA9 từ trên xuống | Tín hiệu Bán | Đỏ đậm | `Avg(Vol(10) > 100000 AND Ref(C,-1)>Ref(MA(C,9),-1) AND C<MA(C,9))` |
| Giá dưới MA9 | Xu thế Giảm | Đỏ | `Avg(Vol(10) > 100000 AND Ref(C,-1)<Ref(MA(C,9),-1) AND C<MA(C,9))` |
| Các case còn lại | Không xác định | Trắng | - |

---

### 2. Theo chỉ báo **MA20**  

(Tương tự MA9, chỉ thay bằng MA20)

---

### 3. Theo chỉ báo **MACD**  

- Nếu chưa đủ dữ liệu → hiển thị `"-"`  
- Nếu đủ dữ liệu → tính theo logic:

| Điều kiện (VI) | Xu thế & Tín hiệu (EN) | Màu sắc | Công thức |
|----------------|-------------------------|---------|-----------|
| MACD cắt Signal từ dưới lên | Tín hiệu Mua | Xanh đậm | `Avg(Vol(10) > 100000 AND Ref(MACD(12,26),-1)<Ref(Signal(12,26,9),-1) AND MACD(12,26) > Signal(12,26,9))` |
| MACD tăng, trên Signal | Xu thế Tăng | Xanh | `Avg(Vol(10) > 100000 AND MACD(12,26)>Ref(MACD(12,26),-1) AND MACD(12,26)>Signal(12,26,9))` |
| MACD cắt Signal từ trên xuống | Tín hiệu Bán | Đỏ đậm | `Avg(Vol(10) > 100000 AND Ref(MACD(12,26),-1)>Ref(Signal(12,26,9),-1) AND MACD(12,26)<Signal(12,26,9))` |
| MACD giảm, dưới Signal | Xu thế Giảm | Đỏ | `Avg(Vol(10) > 100000 AND MACD(12,26)<Ref(MACD(12,26),-1) AND MACD(12,26)<Signal(12,26,9))` |
| Các case khác | Không xác định | Trắng | - |

---

### 4. Theo chỉ báo **RSI**

- Nếu chưa đủ dữ liệu → hiển thị `"-"`  
- Nếu đủ dữ liệu → tính theo logic:

| Điều kiện (VI) | Xu thế & Tín hiệu (EN) | Màu sắc | Công thức |
|----------------|-------------------------|---------|-----------|
| RSI < 30 | Bán quá đà | Xanh | `Avg(Vol(10) > 100000 AND RSI(14)<=30)` |
| RSI cắt 30 từ dưới lên | Tín hiệu Mua | Xanh đậm | `Avg(Vol(10) > 100000 AND Ref(RSI(14),-1)<=30 AND RSI(14)>30)` |
| RSI > 70 | Mua quá đà | Đỏ | `Avg(Vol(10) > 100000 AND RSI(14)>=70)` |
| RSI cắt 70 từ trên xuống | Tín hiệu Bán | Đỏ đậm | `Avg(Vol(10) > 100000 AND Ref(RSI(14),-1)>=70 AND RSI(14)<70)` |
| Các case khác | Không xác định | Trắng | - |

---

### 5. Theo **Khối lượng giao dịch (Volume)**

| Điều kiện (VI) | Xu thế & Tín hiệu (EN) | Màu sắc | Công thức |
|----------------|-------------------------|---------|-----------|
| V > 500k, V > 1.5 × Avg(20 ngày), V > V hôm trước | Đột biến | Vàng | `V>500000 AND V>Avg(Ref(V,-1),20)*1.5 AND V>Ref(V,-1)` |
| Các case khác | Không xác định | Trắng | - |

---

## 6. Xu thế & Tín hiệu **tổng hợp**

- Nếu 1 trong các chỉ báo thành phần là `"-"` → tổng hợp là `"-"`  
- Nếu tất cả đều có tín hiệu → kết hợp theo bảng (MA9, MA20, MACD, RSI).  

Ví dụ:  
- **Xu thế giảm** + RSI Bán quá đà → **Xu thế Giảm quá đà**  
- **Xu thế tăng** + RSI Tín hiệu Bán → **Xu thế Tăng có nguy cơ**  
- Nếu Volume = Đột biến → hiển thị thêm icon ⚡ cạnh kết quả tổng hợp.  

---
