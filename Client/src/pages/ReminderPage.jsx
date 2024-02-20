import Reminder from "../components/Reminder/ReminderHome";
import '../components/Reminder/reminder.module.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function ReminderPage() {
  return (
    <div>
      <Header />
      <div>
      <Reminder />
      <div>
      <Footer />
      </div>
    </div>
    </div>
    
  );
}
