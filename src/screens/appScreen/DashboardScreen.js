import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { getUsers } from '../../services/database';

const DashboardScreen = () => {
  const [userCounts, setUserCounts] = useState({});

  const fetchUsers = async () => {
    const results = await getUsers();
    return results
  }

  useEffect(() => {
    fetchUsers().then((res) => createGraphData(res));
  }, []);

  const createGraphData = (users) => {
    const countUsersByMonth = () => {
      const counts = {};
      users.forEach(user => {
        const date = new Date(user.joinDate);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const key = `${month} ${year}`;
        if (counts[key]) {
          counts[key]++;
        } else {
          counts[key] = 1;
        }
      });
      setUserCounts(counts);
    };
    countUsersByMonth();
  }

  const labels = Object.keys(userCounts);
  const data = Object.values(userCounts);

  const chartConfig = {
    backgroundGradientFrom: '#f7f7f7',
    backgroundGradientTo: '#f7f7f7',
    color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    propsForBackgroundLines: {
      stroke: '#e3e3e3',
      strokeDasharray: ''
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Monthly User Signups</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={{
            labels: labels,
            datasets: [{ data: data }]
          }}
          width={Dimensions.get('window').width - 40}
          height={300}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero={true}
          style={styles.barChart}
          showValuesOnTopOfBars={true}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  barChart: {
    borderRadius: 16,
    marginVertical: 8,
  },
});

export default DashboardScreen;
