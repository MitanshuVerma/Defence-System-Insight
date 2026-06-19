import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# -----------------------------
# Load Dataset
# -----------------------------
df = pd.read_csv("deployment_dataset_100000.csv")

# -----------------------------
# Features
# -----------------------------
feature_columns = [
    "Terrain",
    "Threat_Type",
    "Weather",
    "Severity",
    "Civilian_Density",
    "Time_Of_Day",
    "Location_Type",
    "Target_Type",
    "Enemy_Strength",
    "Urgency",
    "Communication_Status",
    "Medical_Support",
    "Available_Air_Support",
    "Available_Naval_Support",
]

X = df[feature_columns].copy()
y = df["Recommended_Force"]

# -----------------------------
# Label Encoding
# -----------------------------
encoders = {}

for col in feature_columns:
    encoder = LabelEncoder()
    X[col] = encoder.fit_transform(X[col])
    encoders[col] = encoder

target_encoder = LabelEncoder()
y = target_encoder.fit_transform(y)

encoders["Recommended_Force"] = target_encoder

# -----------------------------
# Train/Test Split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)

# -----------------------------
# Random Forest
# -----------------------------
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    class_weight="balanced",
    random_state=42,
    n_jobs=-1,
)

model.fit(X_train, y_train)

# -----------------------------
# Prediction
# -----------------------------
y_pred = model.predict(X_test)

print("=" * 60)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("=" * 60)

print(
    classification_report(
        y_test,
        y_pred,
        target_names=target_encoder.classes_,
    )
)

print("=" * 60)
print("Confusion Matrix")
print(confusion_matrix(y_test, y_pred))

# -----------------------------
# Save Model
# -----------------------------
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("label_encoders.pkl", "wb") as f:
    pickle.dump(encoders, f)

print("\nModel saved successfully.")