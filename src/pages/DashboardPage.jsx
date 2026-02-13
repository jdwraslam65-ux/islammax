import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PlayCircle, BookOpen, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseClient';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for units since we might not have them in DB yet
  const defaultUnits = [
    { id: '1', title: 'الدوال العددية', progress: 65, lessons: 12, completed: 8 },
    { id: '2', title: 'المتتاليات', progress: 30, lessons: 8, completed: 2 },
    { id: '3', title: 'الأعداد المركبة', progress: 0, lessons: 15, completed: 0 },
    { id: '4', title: 'الاحتمالات', progress: 0, lessons: 10, completed: 0 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch real units if they exist
        const records = await pb.collection('mathUnits').getFullList({
          sort: 'order',
          $autoCancel: false
        }).catch(() => []);

        if (records.length > 0) {
          setUnits(records.map(r => ({
            id: r.id,
            title: r.unitName,
            progress: 0, // Placeholder for real progress logic
            lessons: 10, // Placeholder
            completed: 0
          })));
        } else {
          setUnits(defaultUnits);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setUnits(defaultUnits);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            مرحباً، {currentUser?.name || 'طالب'} 👋
          </h1>
          <p className="text-gray-300">
            واصل تقدمك في التحضير للبكالوريا. أنت تسير في الطريق الصحيح!
          </p>
        </div>
        <div className="flex gap-3">
          <Card className="bg-blue-500/20 border-blue-500/30 backdrop-blur-md p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-500/30 rounded-full">
              <Award className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <p className="text-xs text-blue-200">المستوى</p>
              <p className="font-bold text-white">مبتدئ</p>
            </div>
          </Card>
          <Card className="bg-purple-500/20 border-purple-500/30 backdrop-blur-md p-4 flex items-center gap-3">
            <div className="p-2 bg-purple-500/30 rounded-full">
              <Clock className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <p className="text-xs text-purple-200">ساعات الدراسة</p>
              <p className="font-bold text-white">12 ساعة</p>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          وحداتك التعليمية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {units.map((unit, index) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-white">{unit.title}</CardTitle>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-gray-300">
                      {unit.completed}/{unit.lessons} درس
                    </span>
                  </div>
                  <CardDescription className="text-gray-400">
                    {unit.progress === 100 ? 'مكتملة' : unit.progress > 0 ? 'قيد التقدم' : 'لم تبدأ بعد'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>التقدم العام</span>
                      <span>{unit.progress}%</span>
                    </div>
                    <Progress value={unit.progress} className="h-2" />
                  </div>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
                    <PlayCircle className="w-4 h-4 ml-2" />
                    متابعة الدراسة
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;